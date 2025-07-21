# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## sobre o app

app feito para estudo usando o socket.io eniando e recebendo mensagens em tempo real usando formato json.
{
texto: String,
tipo: String,
nome: String,
}

Envia para o Backend, o Backend envia para todos usuarios.
O Frontend recebe através do socket.onmessage e adiciona a variavel mensagens[]
