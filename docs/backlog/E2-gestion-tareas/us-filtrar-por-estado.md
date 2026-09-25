# FS-142 · Filtrar la lista por estado

**Identificador:** FS-142
**Épica:** E2 «Gestión de tareas»

**Como** miembro del equipo, **quiero** filtrar la lista por un estado y volver a verla entera, **para** centrarme en lo pendiente.

## Criterios de aceptación

Los criterios marcados con **[PROPUESTO]** están pendientes de revisión. Los demás salen del PRD.

### Camino feliz

**CA-1. Opciones del filtro** (RF-8, RF-17)
DADO que estoy en la lista,
CUANDO abro el filtro,
ENTONCES puedo elegir Pendiente, En curso, Hecha o Todas, y ninguna opción más.

**CA-2. Filtrar por un estado** (RF-17)
DADO una lista con tareas en varios estados,
CUANDO filtro por "Pendiente",
ENTONCES veo todas las tareas en Pendiente y ninguna de otro estado.

**CA-3. Volver a verlas todas** (RF-17)
DADO que tengo la lista filtrada por un estado,
CUANDO elijo "Todas",
ENTONCES vuelvo a ver todas las tareas, sea cual sea su estado.

**CA-4. Al entrar se ven todas** (RF-17, [SUPUESTO] del PRD, abierto en PA-7)
DADO que entro en la lista,
CUANDO todavía no he elegido ningún filtro,
ENTONCES veo todas las tareas.

**CA-5. El filtro no deja fuera tareas por no tener responsable o fecha** [PROPUESTO]
DADO tareas en Pendiente con responsable y sin él, con fecha y sin ella,
CUANDO filtro por "Pendiente",
ENTONCES aparecen todas; lo único que decide si una tarea sale es su estado.

### Reglas y edge cases

**CA-6. Estado que no existe**
DADO que intento ver la lista filtrada por un estado que no existe, por ejemplo al abrir un enlace guardado o modificado a mano,
CUANDO se carga la lista,
ENTONCES se me avisa claramente, en castellano, de que ese estado no existe y de cuáles sí existen. No se muestra una lista vacía como si no hubiera tareas en ese estado.

**CA-7. Salir del error** [PROPUESTO]
DADO que estoy viendo el aviso de estado inexistente,
CUANDO elijo cualquier opción del filtro o "Todas",
ENTONCES el aviso desaparece y veo la lista filtrada por la opción elegida.

**CA-8. Estado sin tareas** (RF-21)
DADO que no hay ninguna tarea en "Hecha",
CUANDO filtro por "Hecha",
ENTONCES se me dice que no hay tareas en ese estado y se me ofrece crear una desde ahí. Este caso se distingue claramente del aviso de CA-6.

**CA-9. Filtrar no modifica nada** [PROPUESTO]
DADO que tengo la lista filtrada,
CUANDO cambio de filtro o vuelvo a "Todas",
ENTONCES ninguna tarea ha cambiado de estado, responsable ni fecha, y ninguna ha desaparecido.

**CA-10. Mi filtro no afecta a lo que ven los demás** [PROPUESTO]
DADO que yo tengo la lista filtrada por "Pendiente",
CUANDO otra persona abre la lista,
ENTONCES ve la lista con su propio filtro, o con todas las tareas si no ha elegido ninguno.

**CA-11. Una tarea que cambio de estado sale de la vista filtrada** [PROPUESTO]
DADO que tengo la lista filtrada por "Pendiente",
CUANDO paso una tarea a "En curso",
ENTONCES la tarea deja de aparecer en la vista, y el cambio queda guardado aunque ya no la vea.

**CA-12. Una tarea creada en otro estado no se pierde** [PROPUESTO]
DADO que tengo la lista filtrada por "Hecha",
CUANDO creo una tarea nueva que queda en "Pendiente",
ENTONCES la tarea se crea, y se me indica que se ha creado aunque no aparezca en la vista actual.

**CA-13. Lo que ha cambiado otra persona se ve al recargar, con el filtro aplicado** (RF-20)
DADO que tengo la lista filtrada por "En curso" y otra persona ha pasado una tarea a "En curso",
CUANDO recargo la lista,
ENTONCES esa tarea aparece en mi vista.

**CA-14. Qué pasa con el filtro al recargar o volver a entrar** [PROPUESTO]
DADO que tenía la lista filtrada por un estado,
CUANDO recargo la página o vuelvo a entrar en la lista,
ENTONCES se vuelven a ver todas las tareas, como indica CA-4.
