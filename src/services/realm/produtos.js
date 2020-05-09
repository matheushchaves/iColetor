import getRealm from '~/services/realm';
import ProdutoSchema, { ProdutoModel } from '~/schemas/ProdutoSchema';

export async function createProduto(produto) {
    const { codigoDeBarras, quantidade, observacao } = produto;
    const realm = await getRealm();
    const produtoNovo = new ProdutoModel(codigoDeBarras, quantidade, observacao);

    realm.write(() => realm.create('Produto', produtoNovo));
}

export async function getProdutos() {
    const realm = await getRealm();
    const data = realm.objects('Produto')
    return data;
}

export async function getProduto(id) {

    const realm = await getRealm();
    const data = realm.objects('Produto').filtered("idd = '" + id + "'");

    if (data.length)
        return data[0];
    return null;

}

export async function deleteProduto(produto) {

    const { id } = produto;
    const realm = await getRealm();
    const produtos = realm.objects('Produto').filtered("id = '" + id + "'");
    if (produtos.length)
        realm.write(() => realm.delete(produtos));

}

export async function updateProduto(produto){
    const {id, codigoDeBarras, quantidade, observacao} = produto;
    const realm = await getRealm();
    const produtos = realm.objects('Produto').filtered("id = '" + id + "'");
    if (produtos.length){
        const produtoAtual = produto[0];
        realm.write(() => {
            produtoAtual.codigoDeBarras = codigoDeBarras;
            produtoAtual.quantidade = quantidade;
            produtoAtual.observacao = observacao;
            produtoAtual.updatedAt = new Date();
        })
    }
}