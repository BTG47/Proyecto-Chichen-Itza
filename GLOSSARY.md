# Chichén Itzá: Recorridos Virtuales

Sistema de una agencia de turismo digital para recorrer virtualmente el sitio arqueológico de Chichén Itzá, de forma individual o en grupo, mediante avatares con roles.

## Personas y avatares

**Participante**:
Persona registrada en el sistema que controla exactamente un avatar.
_Evitar_: usuario, turista, visitante (para la persona)

**Avatar**:
Representación visual de un participante dentro de los recorridos; tiene una apariencia y un rol.
_Evitar_: personaje, perfil

**Apariencia**:
Aspecto visual elegido para un avatar (p. ej., jaguar de jade).
_Evitar_: skin, diseño del avatar

**Rol**:
Conjunto de permisos de un avatar que determina qué acciones puede ejecutar y a qué zonas puede acceder. Pertenece al avatar, nunca al participante.
_Evitar_: tipo de usuario, perfil

**Visitante**:
Rol básico de un avatar que explora las zonas permitidas.
_Evitar_: «Participante» como nombre de rol

**Guía**:
Rol de un avatar que, además de explorar, coordina al grupo de una visita y explica las zonas. Corresponde a la clase `GuiaTurista` del UML.
_Evitar_: guía turístico, guía de turistas

## Recorridos

**Recorrido**:
Ruta del catálogo por un conjunto de una o más zonas; puede realizarse muchas veces. Corresponde a `RecorridoVirtual`.
_Evitar_: tour, ruta, «recorrido activo»

**Visita**:
Realización concreta de un recorrido, individual o grupal, con fecha de inicio y estado. Corresponde a `SesionRecorrido`.
_Evitar_: sesión (en la interfaz), recorrido activo, recorrido en curso

**Modalidad**:
Forma de una visita: individual o grupal.

**Zona**:
Área del sitio arqueológico con nombre y descripción histórica (p. ej., Juego de Pelota). Corresponde a `ZonaGeografica`.
_Evitar_: lugar, punto de interés, sitio

**Participación**:
Estado de un avatar dentro de una visita: zona actual, estado y progreso.
_Evitar_: progreso del participante, estado del avatar

**Acción**:
Evento registrado por una participación en una zona (p. ej., consultar información, solicitar ayuda).
_Evitar_: interacción, evento

## Distribución

**Conexión**:
Periodo entre que un participante se conecta y se desconecta del sistema.

**Servidor**:
Nodo de una región geográfica que coordina visitas y atiende conexiones.
_Evitar_: host, nodo (en la interfaz)
