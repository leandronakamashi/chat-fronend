import { Header } from './../header/header';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-nick-name',
  imports: [FormsModule, Header],
  templateUrl: './enter-nick-name.html',
  styleUrl: './enter-nick-name.scss',
})
export class EnterNickName {
  nickName: string = '';
  socket!: WebSocket;

  constructor(private router: Router) {
    // Conecte ao WebSocket (ajuste a URL conforme seu backend)
    this.socket = new WebSocket('ws://localhost:3000');
  }

  enviarNick() {
    if (this.nickName.trim()) {
      // Envie o nickname como JSON
      console.log('Enviando nickname:', this.nickName);
      this.socket.send(JSON.stringify({ tipo: 'nick', nick: this.nickName }));
      // Redirecione para a página principal após enviar o nickname
      this.router.navigate(['/main'], { queryParams: { nome: this.nickName } });
    }
  }
}
