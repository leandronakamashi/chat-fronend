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
  constructor() {}

  ngOnInit(): void {
    // Initialization logic here
    // this.socket = new WebSocket('ws://localhost:3000');
    this.socket = new WebSocket(
      'wss://chat-backend-production-02f0.up.railway.app:3000'
    );

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
