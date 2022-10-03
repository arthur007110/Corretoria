import random
from typing import Dict

nomes = [
    'Ana', 'Maria', 'Joao', 'Jose', 'Antonio', 'Francisco', 'Carlos',
    'Pedro', 'Paulo', 'Manoel', 'Raimundo', 'Joaquim', 'Miguel', 'Luiz',
    'Marcos', 'Ricardo', 'Jorge', 'Alberto', 'Alexandre', 'Cleber',
    'Cleiton', 'Cleide', 'Cleiton', 'Cleide', 'Cleiton', 'Cleide',
    'Joana', 'Joaquina', 'Aline', 'Alessandra', 'Alessandro',
]
sobrenomes = [
    'Silva', 'Santos', 'Souza', 'Oliveira', 'Pereira', 'Rodrigues',
    'Almeida', 'Nascimento', 'Lima', 'Ferreira', 'Martins', 'Araujo',
    'Ribeiro', 'Gomes', 'Carvalho', 'Costa', 'Correia', 'Alves',
    'Mendes', 'Dias', 'Rocha', 'Neves', 'Barros', 'Moraes', 'Reis',
    'Goncalves', 'Moreira', 'Nogueira', 'Azevedo', 'Teixeira',
    'Vieira', 'Fernandes', 'Barbosa', 'Goncalves',
]

corretores = dict()
proprietarios = dict()
inquilinos = dict()
imoveis = dict()
imoveisValores = dict()
alugueis = dict()

def generateCPF():
    cpf = ''
    for _ in range(11):
        cpf += str(random.randint(0, 9))
    return cpf

def popularCorretores(qtd):
    for i in range(qtd):
        nome = nomes[random.randint(0, len(nomes) - 1)]
        sobrenome = sobrenomes[random.randint(0, len(sobrenomes) - 1)]
        nome_completo = nome + ' ' + sobrenome
        cpf = generateCPF()
        if(cpf in corretores):
            i -= 1
            continue
        sqlCommand = 'INSERT INTO pessoa (cpf, nome, tipoPessoa) VALUES ("'+ cpf +'", "' + nome_completo + '", "corretor");'
        corretores[cpf] = sqlCommand

def popularProprietarios(qtd):
    for _ in range(qtd):
        nome = nomes[random.randint(0, len(nomes) - 1)]
        sobrenome = sobrenomes[random.randint(0, len(sobrenomes) - 1)]
        nome_completo = nome + ' ' + sobrenome
        cpf = generateCPF()
        if(cpf in proprietarios):
            i -= 1
            continue
        sqlCommand = 'INSERT INTO pessoa (cpf, nome, tipoPessoa) VALUES ("'+ cpf +'", "' + nome_completo + '", "proprietario");'
        proprietarios[cpf] = sqlCommand

def popularInquilinos(qtd):
    for _ in range(qtd):
        nome = nomes[random.randint(0, len(nomes) - 1)]
        sobrenome = sobrenomes[random.randint(0, len(sobrenomes) - 1)]
        nome_completo = nome + ' ' + sobrenome
        cpf = generateCPF()
        if(cpf in inquilinos):
            i -= 1
            continue
        sqlCommand = 'INSERT INTO pessoa (cpf, nome, tipoPessoa) VALUES ("'+ cpf +'", "' + nome_completo + '", "inquilino");'
        inquilinos[cpf] = sqlCommand

def popularImoveis(qtd):
    for i in range(qtd):
        id = str(i+1)
        iProprietario = random.choice(list(proprietarios))
        iCorretor = random.choice(list(corretores))
        alugado = '0'
        descricao = 'Imovel de teste'
        valor = str(round(random.random() * 10000, 2))
        cep = str(random.randint(10000000, 99999999))
        numero = str(random.randint(1, 999))
        rua = 'Rua de teste'
        bairro = 'Bairro de teste'
        sqlCommand = 'INSERT INTO imovel (id, cpfProprietario, cpfCorretor, alugado, descricao, valor, cep, numero, bairro, rua) VALUES ("'+ id +'", "' + iProprietario + '", "' + iCorretor + '", "' + alugado + '", "' + descricao + '", "' + valor + '", "' + cep + '", "' + numero + '", "' + bairro + '", "' + rua + '");'
        imoveis[id] = sqlCommand
        imoveisValores[id] = valor

def popularAlugueis(qtd):
    for _ in range(qtd):
        imovel = random.choice(list(imoveis))
        inquilino = random.choice(list(inquilinos))
        dataInicio = '2020-01-01'
        valor = imoveisValores[imovel]
        sqlCommand = 'INSERT INTO aluguel (idImovel, cpfInquilino, data, valor) VALUES ("' + imovel + '", "' + inquilino + '", "' + dataInicio + '", "' + valor + '");'
        alugueis[imovel] = sqlCommand

f = open("popularBancoCorretoria.txt", "w")
popularCorretores(5)
popularProprietarios(5)
popularInquilinos(5)
popularImoveis(5)
popularAlugueis(5)
for i in corretores:
    f.write(corretores[i] + '\n')
for i in proprietarios:
    f.write(proprietarios[i] + '\n')
for i in inquilinos:
    f.write(inquilinos[i] + '\n')
for i in imoveis:
    f.write(imoveis[i] + '\n')
for i in alugueis:
    f.write(alugueis[i] + '\n')
f.close()
