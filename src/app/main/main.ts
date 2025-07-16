import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  imports: [FormsModule, CommonModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main implements OnInit {
  socket!: WebSocket;
  mensagens: { texto: string; tipo: string }[] = [];
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

    this.socket.onopen = (event) => {
      this.conectado = true;
      console.log('WebSocket conectado!');
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.tipo === 'valor') {
          // Use data.valor como quiser
          this.mensagens.push({
            texto: `Total de pessoas: ${data.valor}`,
            tipo: 'total',
          });
        }
      } catch {
        this.mensagens.push({
          texto: `recebida: ${event.data}`,
          tipo: 'recebido',
        });
        // Mensagem normal
      }
    };
  }

  enviar() {
    if (this.mensagem.trim()) {
      this.socket.send(this.mensagem);
      this.mensagens.push({
        texto: `Você:  ${this.mensagem}`,
        tipo: 'enviado',
      });
      this.mensagem = '';
    }
  }
}
