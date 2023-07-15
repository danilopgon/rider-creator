# proyecto-final-4geeks

Proyecto final de @michelcub, @RofinhoOo y @danilopgon

## Backend desde raiz:

```
pipenv install
pipenv shell
pipenv run start
```

## Frontend desde app:

```
npm install
npm run dev
_________________

Antes de ejecutar en el server de APP.py:

npm run build

```
## Migrate db
```
pipenv run init  -> para iniciar la db (solo se hace una vez)
pipenv run migrate -> registrar los cambios de la db
pipenv run upgrade -> aplicar los cambios en la db
pipenv  run downgrade -> deshacer el ultimo cambio de la db
```
