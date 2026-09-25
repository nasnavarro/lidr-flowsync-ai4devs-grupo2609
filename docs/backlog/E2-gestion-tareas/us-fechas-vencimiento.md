# FS-118 · Fecha de vencimiento de una tarea

**Identificador:** FS-118
**Épica:** E2 «Gestión de tareas»

**Como** miembro del equipo, **quiero** poner, cambiar o quitar la fecha de vencimiento de una tarea y verla en la lista, **para** saber de un vistazo para cuándo es y cuáles ya se han pasado de plazo.

## Criterios de aceptación

Los criterios marcados con **[PROPUESTO]** están pendientes de revisión. Los demás salen del PRD.

### Camino feliz

**CA-1. Crear con fecha** (RF-7)
DADO que estoy creando una tarea con título,
CUANDO le pongo una fecha de vencimiento y la creo,
ENTONCES la tarea aparece en la lista con esa fecha.

**CA-2. Crear sin fecha** (RF-7)
DADO que estoy creando una tarea con título,
CUANDO la creo sin poner fecha,
ENTONCES la tarea se crea igual y en la lista aparece sin fecha.

**CA-3. Cambiar la fecha** (RF-13)
DADO una tarea con fecha de vencimiento,
CUANDO la cambio por otra fecha,
ENTONCES la lista muestra la fecha nueva y la anterior deja de aparecer.

**CA-4. Poner fecha a una tarea que no tenía** (RF-13)
DADO una tarea sin fecha de vencimiento,
CUANDO le pongo una fecha,
ENTONCES la tarea pasa a mostrar esa fecha en la lista.

**CA-5. Quitar la fecha** (RF-13)
DADO una tarea con fecha de vencimiento,
CUANDO se la quito,
ENTONCES la tarea sigue existiendo, con el mismo título, responsable y estado, y aparece sin fecha.

### Reglas y edge cases

**CA-6. Se admiten fechas pasadas** (RF-16)
DADO que estoy creando o editando una tarea,
CUANDO le pongo una fecha anterior a hoy,
ENTONCES se guarda sin error y sin pedir confirmación.

**CA-7. Cualquiera puede cambiar la fecha de cualquier tarea** (RF-15)
DADO una tarea cuyo responsable es otra persona, o que no tiene responsable,
CUANDO cambio o quito su fecha,
ENTONCES el cambio se guarda igual que si la tarea fuera mía.

**CA-8. Todo el equipo ve la misma fecha, esté en el huso horario que esté** [PROPUESTO]
DADO una tarea con fecha de vencimiento 15 de octubre,
CUANDO la miran personas de husos horarios distintos,
ENTONCES todas ven "15 de octubre", nunca el 14 o el 16.
*Motivo: la fecha de vencimiento es un día del calendario, no una hora, y el equipo trabaja en varios husos horarios.*

**CA-9. La tarea vence al final de su día, no al empezar** [PROPUESTO]
DADO una tarea cuya fecha de vencimiento es hoy,
CUANDO la miro en cualquier momento de hoy,
ENTONCES no se ha pasado de plazo; pasa a estarlo a partir de mañana.

**CA-10. Una tarea vencida se reconoce solo por su fecha, sin marca especial** (NO-alcance del PRD)
DADO una tarea no hecha con fecha anterior a hoy,
CUANDO la veo en la lista,
ENTONCES veo su fecha igual que la de cualquier otra tarea, sin color, icono ni etiqueta de "vencida".

**CA-11. Una tarea hecha no está "fuera de plazo"** [PROPUESTO]
DADO una tarea en estado Hecha con fecha anterior a hoy,
CUANDO se habla de tareas pasadas de plazo,
ENTONCES esta no cuenta, porque se terminó.

**CA-12. Fecha imposible** [PROPUESTO]
DADO que estoy poniendo la fecha de una tarea,
CUANDO intento poner una fecha que no existe, como el 31 de febrero,
ENTONCES no se guarda, se me dice por qué en castellano, y la tarea conserva la fecha que tenía o sigue sin fecha.

**CA-13. Cancelar no cambia nada** [PROPUESTO]
DADO que estoy cambiando la fecha de una tarea,
CUANDO cancelo antes de confirmar,
ENTONCES la tarea conserva la fecha que tenía, o sigue sin fecha.

**CA-14. Si el título no es válido, la fecha no crea la tarea** (RF-6)
DADO que estoy creando una tarea con fecha pero con el título vacío o solo con espacios,
CUANDO intento crearla,
ENTONCES la tarea no se crea y se me dice que falta el título.

**CA-15. Los demás ven el cambio al abrir o recargar la lista** (RF-20)
DADO que otra persona ha cambiado o quitado la fecha de una tarea,
CUANDO abro o recargo la lista,
ENTONCES veo la fecha nueva; antes de recargar puedo seguir viendo la anterior.

**CA-16. Dos cambios a la vez: se queda el último** (RNF-4)
DADO que dos personas cambian la fecha de la misma tarea casi a la vez,
CUANDO se guardan ambos cambios,
ENTONCES la tarea queda con la fecha del último cambio guardado, sin aviso para ninguna de las dos.

**CA-17. La fecha se muestra en formato español** [PROPUESTO] (RNF-7)
DADO una tarea con fecha de vencimiento,
CUANDO la veo en la lista,
ENTONCES se muestra con día, mes y año en formato español (por ejemplo, "15/10/2026"), nunca en formato americano.
