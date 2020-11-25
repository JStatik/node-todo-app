## Aplicación de comandos

Instalar paquetes de Node JS
```
npm install
```

Cargar TODOS
```
node app listar
```

Crear TODO
```
node app crear -d "Descripción obligatoria"
```

Actualizar TODO
```
node app actualizar -d "Descripción obligatoria" -c "Completado opcional: default true"
```

Eliminar TODO
```
node app eliminar -d "Descripcion obligatoria"
```

Filtrar TODO por descripcion
```
node app filtrarD -d "Descripcion obligatoria"
```

Filtrar TODOS por completado
```
node app filtrarC -c "Completado opcional: default true"
```
