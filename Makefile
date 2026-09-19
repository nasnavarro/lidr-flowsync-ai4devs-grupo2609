SHELL := /bin/bash

.PHONY: setup start

setup: backend/.env
	cd backend && npm install
	cd frontend && npm install
	cd backend && grep -Eq '^APP_KEY=.+' .env || node ace generate:key
	cd backend && node ace migration:run

backend/.env:
	cp backend/.env.example backend/.env

# Runs backend and frontend together; killing `make start` (Ctrl+C) stops both.
start:
	@trap 'kill 0' EXIT INT TERM; \
	(cd backend && npm run dev) & \
	(cd frontend && npm run dev) & \
	wait
