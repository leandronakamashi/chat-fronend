import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [FormsModule, CommonModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main implements OnInit {
  socket!: WebSocket;
  mensagens: { texto: string; tipo: string; nome: string }[] = [];
  mensagem: string = '';
  totalClientes: { tipo: string; valor: number } = { tipo: 'total', valor: 0 };
  conectado = false;
  nome: string = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // url do backend localhost ou do railway
    // this.socket = new WebSocket('ws://localhost:3000');
    this.socket = new WebSocket(
      'wss://chat-backend-production-02f0.up.railway.app'
    );
    this.route.queryParams.subscribe((params) => {
      this.nome = params['nome'] || '';
    });

    this.socket.onopen = (event) => {
      this.conectado = true;
      console.log('WebSocket conectado!');
    };

    this.socket.onmessage = (event) => {
      // Verifica se a mensagem é um JSON válido alimenta a variavel data
      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }
      //se for do tipo valor atualiza o total de clientes
      if (data.tipo === 'valor') {
        this.totalClientes = {
          tipo: 'total',
          valor: data.valor,
        };
      } else if (data.tipo === 'mensagem') {
        // se for do tipo mensagem adiciona a mensagem na lista de mensagens
        this.mensagens.push({
          texto: data.texto,
          tipo: 'recebido',
          nome: data.nome,
        });
      }
    };
  }

  enviar() {
    if (this.mensagem.trim()) {
      console.log('enviado');
      // Envia a mensagem para o servidor WebSocket em formato JSON
      this.socket.send(
        JSON.stringify({
          texto: this.mensagem,
          tipo: 'mensagem',
          nome: this.nome,
        })
      );
      //limpa a mensagem após enviar
      this.mensagem = '';
    }
  }
}
