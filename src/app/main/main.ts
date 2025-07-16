import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  imports: [FormsModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main implements OnInit {
  socket!: WebSocket;
  mensagens: string[] = [];
  mensagem: string = '';
  totalClientes: number = 1;
  conectado = false;
  constructor() {}

  ngOnInit(): void {
    // Initialization logic here
    // this.socket = new WebSocket('ws://localhost:3000');
    this.socket = new WebSocket(
      'wss://chat-backend-production-02f0.up.railway.app'
    );

    this.socket.onopen = () => {
      this.conectado = true;
      console.log('WebSocket conectado!');
    };

    this.socket.onmessage = (event) => {
      this.mensagens.push('Recebida: ' + event.data);
    };
  }

  enviar() {
    if (this.mensagem.trim()) {
      this.socket.send(this.mensagem);
      this.mensagens.push('Você: ' + this.mensagem);
      this.mensagem = '';
    }
  }
}
