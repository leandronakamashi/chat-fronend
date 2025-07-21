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
    // Initialization logic here
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
      //   try {
      //     const data = JSON.parse(event.data);
      //     if (data.tipo === 'valor') {
      //       // Use data.valor como quiser
      //       this.mensagens.push({
      //         texto: `Total de pessoas: ${data.valor}`,
      //         tipo: 'total',
      //         nome: '',
      //       });
      //     }
      //   } catch {
      //     const data = JSON.parse(event.data);
      //     if (data.tipo === 'mensagem') {
      //       this.mensagens.push({
      //         texto: `${data.nome}: ${data.texto}`,
      //         tipo: 'recebido',
      //         nome: data.nome,
      //       });
      //     }
      //   }
      // };
      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        // Se não for JSON, ignore ou trate como texto simples
        return;
      }

      if (data.tipo === 'valor') {
        this.totalClientes = {
          tipo: 'total',
          valor: data.valor,
        };
      } else if (data.tipo === 'mensagem') {
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
      // this.socket.send(this.mensagem);
      this.socket.send(
        JSON.stringify({
          texto: this.mensagem,
          tipo: 'mensagem',
          nome: this.nome,
        })
      );
      // this.mensagens.push({
      //   texto: this.mensagem,
      //   tipo: 'enviado',
      //   nome: this.nome,
      // });
      this.mensagem = '';
    }
  }
}
