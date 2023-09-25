### Tech: Typescript

# Para executar

```cmd
npm i
```

```cmd
npm run start
```

ou:

```cmd
docker build --tag rinha-repo .
```

```cmd
docker run --name rinha-repo -d -p 3000:3000 rinha-repo
```

```cmd
docker run -v ./source.rinha.json:/var/rinha/source.rinha.json --memory=2gb --cpus=2 --name rinha-repo -d -p 3000:3000 rinha-repo
```

Para ver o resultado:

```cmd
docker logs rinha-ts
```

## Sobre:

Essa é minha primeira tentativa na criação de um compilador, já que nunca havia estudado o assunto, aproveitei a rinha para me desafiar a tentar fazer algo aceitavel, ao mesmo tempo que aprendo e troco conhecimento :)
