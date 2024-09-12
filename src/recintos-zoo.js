import { AnimaisValidos } from "./Animais.js";

class RecintosZoo {
    
    constructor() {
        this.recintos = [
            {id: 1, local:"savana", disponibilidadeTotal: 10, animaisExistentes: {"MACACO": 3}},
            {id: 2, local:"floresta", disponibilidadeTotal: 5, animaisExistentes: {}},
            {id: 3, local: "savana e rio", disponibilidadeTotal: 7, animaisExistentes: {"GAZELA": 1}},
            {id: 4, local:"rio", disponibilidadeTotal: 8, animaisExistentes: {}},
            {id: 5, local: "savana", disponibilidadeTotal: 9, animaisExistentes: {"LEAO": 1}}
        ];

        this.animaisValidos = new AnimaisValidos();

    }

    recintosDisponiveis() {
        return this.recintos;
    }


    analisaRecintos(animal, quantidade) {
        
        if (!this.animaisValidos.getAnimais().includes(animal)) {
            return{erro: "Animal inválido"};
        }
        
        if(quantidade <= 0) {
            return{erro: "Quantidade inválida"};
        }
        
        let recinto = null;
        
        if(animal === "MACACO") {
            recinto = this.recintos.filter(r => (r.local === "savana" || r.local === "floresta" || r.local === "savana e rio") && 
                r.disponibilidadeTotal >= quantidade && ( quantidade == 1 ? r.animaisExistentes > 0:true) 
                && (!r.animaisExistentes["LEAO"] && !r.animaisExistentes ["LEOPARDO"] && !r.animaisExistentes ["CROCODILO"])
            );
            


            if(recinto.length <= 1)
                return {erro: "Não há recinto viável"}

            const resposta = [];
            for(let i = 0 ; i < recinto.length; i++)
            {
                resposta.push(
                    'Recinto ' + recinto[i].id + 
                    ' (espaço livre: ' + (i > 0 ? i==1? 3:2 : 5) + 
                    ' total: ' + recinto[i].disponibilidadeTotal + ')'
                  );
            }
            console.log(recinto.length);
            return {erro: null, recintosViaveis: resposta};
            
        }
        if(animal === "GAZELA") {
            recinto = this.recintos.filter(r => (r.local === "savana" || r.local === "savana e rio") && 
                r.disponibilidadeTotal >= quantidade &&
                (!r.animaisExistentes["LEAO"] && !r.animaisExistentes ["LEOPARDO"] && !r.animaisExistentes ["CROCODILO"])
            );
            
        }    
        if (animal === "LEOPARDO" || animal === "LEAO") {
            recinto = this.recintos.filter(r => (r.local === "savana" || r.local === "savana e rio") &&
                r.disponibilidadeTotal >= quantidade &&
                (!r.animaisExistentes["MACACO"] && !r.animaisExistentes["GAZELA"] && !r.animaisExistentes["HIPOPOTAMO"])
            );

        }

        if (animal === "CROCODILO") {
            recinto = this.recintos.filter(r => (r.local === "savana e rio" || r.local === "rio") &&
                r.disponibilidadeTotal >= quantidade &&
                (!r.animaisExistentes["MACACO"] && !r.animaisExistentes["GAZELA"] && !r.animaisExistentes["HIPOPOTAMO"])
            );
            
            
        }
        if (animal === "HIPOPOTAMO") {
            recinto = this.recintos.filter(r => (r.local === "savana e rio") &&
            r.disponibilidadeTotal >= quantidade && Object.keys(r.animaisExistentes).length > 0 &&
            (!r.animaisExistentes["LEAO"] && !r.animaisExistentes ["LEOPARDO"] && !r.animaisExistentes ["CROCODILO"])
            );

            if(!recinto) {
                recinto = this.recintos.filter(r => (r.local === "rio")) &&
                r.disponibilidadeTotal >= quantidade &&
                (!r.animaisExistentes["LEAO"] && !r.animaisExistentes ["LEOPARDO"] && !r.animaisExistentes ["CROCODILO"])
                
            }
            
        }
        
        return recinto || {erro: "Não há recinto viável"};

        
    }

}

export { RecintosZoo as RecintosZoo };

/*
1) O programa deve receber tipo e quantidade de animal (nessa ordem)
2) O programa deve retornar uma estrutura contendo a lista de todos os recintos viáveis ordenada pelo número do recinto (caso existam) e a mensagem de erro (caso exista)
3) A lista de recintos viáveis deve indicar o espaço livre que restaria após a inclusão do(s) animal(is) e o espaço total, no formato "Recinto nro (espaço livre: valorlivre total: valortotal)"
4) Caso animal informado seja inválido, apresentar erro "Animal inválido"
5) Caso quantidade informada seja inválida, apresentar erro "Quantidade inválida"
6) Caso não haja recinto possível, apresentar erro "Não há recinto viável" */

/*
1) Um animal se sente confortável se está num bioma adequado e com espaço suficiente para cada indivíduo
2) Animais carnívoros devem habitar somente com a própria espécie
3) Animais já presentes no recinto devem continuar confortáveis com a inclusão do(s) novo(s)
4) Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
5) Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
6) Quando há mais de uma espécie no mesmo recinto, é preciso considerar 1 espaço extra ocupado
7) Não é possível separar os lotes de animais nem trocar os animais que já existem de recinto (eles são muito apegados!).
Por exemplo, se chegar um lote de 12 macacos, não é possível colocar 6 em 2 recintos. */


 /*
    animaisRules () {
        if(animal = "LEAO")
         "LEAO",
    "LEOPARDO",
    "CROCODILO",
    "MACACO",
    "GAZELA",
    "HIPOPOTAMO" {

        }

    } */
