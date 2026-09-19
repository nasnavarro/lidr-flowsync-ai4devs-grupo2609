import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/features/auth/auth-context";
import { fetchProfile } from "@/features/auth/api";
import type { User } from "@/features/auth/types";

export function ProfilePage() {
  const { token, logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    fetchProfile(token)
      .then(({ data }) => setProfile(data))
      .catch((err) => {
        setError(
          err instanceof ApiError
            ? (err.generalMessage ?? err.message)
            : err.message,
        );
      });
  }, [token]);

  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Your profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!error && !profile && (
            <p className="text-sm text-muted-foreground">Loading…</p>
          )}

          {profile && (
            <dl className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Name</dt>
                <dd>{profile.fullName ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Email</dt>
                <dd>{profile.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Initials</dt>
                <dd>{profile.initials}</dd>
              </div>
            </dl>
          )}

          <Button variant="outline" onClick={() => logout()}>
            Log out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
