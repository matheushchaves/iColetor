import guid from './guid';

export default class ProdutoSchema {
    static schema = {
        name: 'Produto',
        primaryKey: 'id',
        properties: {
            id : {type: 'string', indexed: true},
            codigoDeBarras: 'string',
            quantidade: {type : 'int', default: 0},
            observacao: 'string',
            createdAt: 'date',
            updatedAt: 'date'
        }
    }
}

export class ProdutoModel {
    constructor(codigoDeBarras, quantidade, observacao){
        this.id = guid();
        this.codigoDeBarras = codigoDeBarras;
        this.quantidade = quantidade;
        this.observacao = observacao;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}