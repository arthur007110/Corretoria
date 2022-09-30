import random
from typing import Dict

nomes = [
    'Ana', 'Maria', 'João', 'José', 'Antonio', 'Francisco', 'Carlos',
    'Pedro', 'Paulo', 'Manoel', 'Raimundo', 'Joaquim', 'Miguel', 'Luiz',
    'Marcos', 'Ricardo', 'Jorge', 'Alberto', 'Alexandre', 'Cleber',
    'Cleiton', 'Cleide', 'Cleiton', 'Cleide', 'Cleiton', 'Cleide',
]
sobrenomes = [
    'Silva', 'Santos', 'Souza', 'Oliveira', 'Pereira', 'Rodrigues',
    'Almeida', 'Nascimento', 'Lima', 'Ferreira', 'Martins', 'Araújo',
    'Ribeiro', 'Gomes', 'Carvalho', 'Costa', 'Correia', 'Alves',
    'Mendes', 'Dias', 'Rocha', 'Neves', 'Barros', 'Moraes', 'Reis',
    'Gonçalves', 'Moreira', 'Nogueira', 'Azevedo', 'Teixeira',
    'Vieira', 'Fernandes', 'Barbosa', 'Gonçalves',
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

def popularCorretores():
    for i in range(10):
        nome = nomes[random.randint(0, len(nomes) - 1)]
        sobrenome = sobrenomes[random.randint(0, len(sobrenomes) - 1)]
        nome_completo = nome + ' ' + sobrenome
        cpf = generateCPF()
        if(cpf in corretores):
            i -= 1
            continue
        sqlCommand = 'INSERT INTO pessoa (cpf, nome, tipoPessoa) VALUES ("'+ cpf +'", "' + nome_completo + '", "corretor");'
        corretores[cpf] = sqlCommand

def popularProprietarios():
    for _ in range(10):
        nome = nomes[random.randint(0, len(nomes) - 1)]
        sobrenome = sobrenomes[random.randint(0, len(sobrenomes) - 1)]
        nome_completo = nome + ' ' + sobrenome
        cpf = generateCPF()
        if(cpf in proprietarios):
            i -= 1
            continue
        sqlCommand = 'INSERT INTO pessoa (cpf, nome, tipoPessoa) VALUES ("'+ cpf +'", "' + nome_completo + '", "proprietario");'
        proprietarios[cpf] = sqlCommand

def popularInquilinos():
    for _ in range(10):
        nome = nomes[random.randint(0, len(nomes) - 1)]
        sobrenome = sobrenomes[random.randint(0, len(sobrenomes) - 1)]
        nome_completo = nome + ' ' + sobrenome
        cpf = generateCPF()
        if(cpf in inquilinos):
            i -= 1
            continue
        sqlCommand = 'INSERT INTO pessoa (cpf, nome, tipoPessoa) VALUES ("'+ cpf +'", "' + nome_completo + '", "inquilino");'
        inquilinos[cpf] = sqlCommand

def popularImoveis():
    for i in range(10):
        id = str(i)
        iProprietario = random.choice(list(proprietarios))
        iCorretor = random.choice(list(corretores))
        print(iProprietario)
        print(iCorretor)
        alugado = '0'
        descricao = 'Imóvel de teste'
        valor = str(random.random() * 10000)
        cep = str(random.randint(10000000, 99999999))
        numero = str(random.randint(1, 9999))
        rua = 'Rua de teste'
        bairro = 'Bairro de teste'
        quartos = str(random.randint(1, 5))
        banheiros = str(random.randint(1, 5))
        area = str(random.random() * 100)
        garagem = str(random.randint(0, 1))
        quintal = str(random.randint(0, 1))
        tipo = random.choices(['casa', 'apartamento', 'terreno', 'condominio'])[0]
        sqlCommand = 'INSERT INTO imovel (id, cpfProprietario, cpfCorretor, alugado, descricao, valor, cep, numero, bairro, rua, quartos, banheiros, area, garagem, quintal, tipo) VALUES ("'+ id +'", "' + iProprietario + '", "' + iCorretor + '", "' + alugado + '", "' + descricao + '", "' + valor + '", "' + cep + '", "' + numero + '", "' + bairro + '", "' + rua + '", "' + quartos + '", "' + banheiros + '", "' + area + '", "' + garagem + '", "' + quintal + '", "' + tipo + '");'
        imoveis[id] = sqlCommand
        imoveisValores[id] = valor

def popularAlugueis():
    for _ in range(10):
        imovel = random.choice(list(imoveis))
        inquilino = random.choice(list(inquilinos))
        dataInicio = '2020-01-01'
        valor = imoveisValores[imovel]
        sqlCommand = 'INSERT INTO aluguel (idImovel, cpfInquilino, data, valor) VALUES ("' + imovel + '", "' + inquilino + '", "' + dataInicio + '", "' + valor + '");'
        alugueis[imovel] = sqlCommand

f = open("popularBancoCorretoria.txt", "w")
popularCorretores()
popularProprietarios()
popularInquilinos()
popularImoveis()
popularAlugueis()
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
