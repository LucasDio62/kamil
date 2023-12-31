import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CadastroServiceService } from 'src/app/service/cadastro-service.service';

@Component({
  selector: 'app-cadastro-servicos',
  templateUrl: './cadastro-servicos.component.html',
  styleUrls: ['./cadastro-servicos.component.scss']
})
export class CadastroServicosComponent {

  public nomeIgual = false
  public msgAdd = false
  public displayPrincipal = true
  public msgDisplayButton = "Servicos"

  constructor(private fb: FormBuilder, private cadastroService: CadastroServiceService) {}

  form = this.fb.group({
    servico: ['', Validators.required],
    comissao: ['', Validators.required]
  })

  public alterarDisplay() {
    if(this.displayPrincipal == true) {
      this.msgDisplayButton = "Adicionar Servicos"
      this.displayPrincipal = false
      this.visualizarServicos()
    }else{
      this.msgDisplayButton = "Servicos"
      this.displayPrincipal = true
    }
  }

  public async visualizarServicos() {
    var servicos = await this.cadastroService.dadosServicos()
    var table = document.getElementById("table")!
    for(let i = 0; i < servicos.length; i++) {
      var tr = document.createElement('tr')
      //tr style
      tr.style.height = '25px'
      tr.style.width = '100%'
      tr.style.display = 'flex'
      tr.style.verticalAlign = 'middle'

      var textTdServico = document.createTextNode(servicos[i].servico)
      var textTdComissao = document.createTextNode(servicos[i].comissao)
      var tdServico = document.createElement("td")
      var tdComissao = document.createElement("td")
      //td style
      tdServico.style.verticalAlign = 'middle'
      tdServico.style.border = '1px solid black'
      tdServico.style.textAlign = 'center'
      tdServico.style.width = '50%'

      tdComissao.style.border = '1px solid black'
      tdComissao.style.verticalAlign = 'middle'
      tdComissao.style.textAlign = 'center'
      tdComissao.style.width = '50%'

      tdServico.appendChild(textTdServico)
      tdComissao.appendChild(textTdComissao)
      tr.appendChild(tdServico)
      tr.appendChild(tdComissao)
      table.appendChild(tr)
    }
  }

  public async addServico() {
    this.nomeIgual = false
    this.msgAdd = false
    var servico = this.form.value.servico!
    var comissao = Number(this.form.value.comissao!)
    if(await this.cadastroService.adicionarServico(servico, comissao) == true) {
      this.nomeIgual = true
    }else{
      this.msgAdd = true
    }
    this.form.setValue({
      servico: '',
      comissao: ''
    })
  }
}
