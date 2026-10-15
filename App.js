import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';

// Dados dos 40 sensores recebidos da API.
// Status 1 = ativo | Status 0 = inativo.

const dadosSensores = [
  ['S1', 'luminosidade', 0],
  ['S2', 'luminosidade', 1],
  ['S3', 'infravermelho', 1],
  ['S4', 'umidade', 0],
  ['S5', 'infravermelho', 1],
  ['S6', 'infravermelho', 1],
  ['S7', 'umidade', 1],
  ['S8', 'infravermelho', 1],
  ['S9', 'luminosidade', 1],
  ['S10', 'luminosidade', 1],
  ['S11', 'temperatura', 1],
  ['S12', 'infravermelho', 1],
  ['S13', 'rfid', 1],
  ['S14', 'temperatura', 1],
  ['S15', 'infravermelho', 1],
  ['S16', 'luminosidade', 1],
  ['S17', 'umidade', 1],
  ['S18', 'temperatura', 1],
  ['S19', 'luminosidade', 0],
  ['S20', 'luminosidade', 1],
  ['S21', 'rfid', 1],
  ['S22', 'infravermelho', 1],
  ['S23', 'rfid', 1],
  ['S24', 'rfid', 1],
  ['S25', 'rfid', 1],
  ['S26', 'umidade', 1],
  ['S27', 'umidade', 1],
  ['S28', 'rfid', 1],
  ['S29', 'temperatura', 1],
  ['S30', 'rfid', 1],
  ['S31', 'temperatura', 1],
  ['S32', 'umidade', 1],
  ['S33', 'temperatura', 1],
  ['S34', 'temperatura', 0],
  ['S35', 'umidade', 1],
  ['S36', 'infravermelho', 1],
  ['S37', 'temperatura', 1],
  ['S38', 'luminosidade', 1],
  ['S39', 'rfid', 1],
  ['S40', 'luminosidade', 1],
];

const sensoresIniciais = dadosSensores.map(([codigo, tipo, status]) => ({
  id: codigo,
  tipo,
  ativo: status === 1,
  icone:
    tipo === 'luminosidade' ? '☼' :
    tipo === 'infravermelho' ? '◎' :
    tipo === 'umidade' ? '♢' :
    tipo === 'temperatura' ? '♨' : '▦',
}));

export default function App() {
  const [tela, setTela] = useState('Sensores');
  const [listaSensores, setListaSensores] = useState(sensoresIniciais);
  const [filtro, setFiltro] = useState('Todos');
  const [busca, setBusca] = useState('');

  const ativos = listaSensores.filter(sensor => sensor.ativo).length;
  const inativos = listaSensores.length - ativos;

  const listaFiltrada = listaSensores.filter(sensor => {
    const correspondeFiltro =
      filtro === 'Todos' ||
      (filtro === 'Ativos' && sensor.ativo) ||
      (filtro === 'Inativos' && !sensor.ativo);

    const correspondeBusca =
      sensor.id.toLowerCase().includes(busca.toLowerCase()) ||
      sensor.tipo.toLowerCase().includes(busca.toLowerCase());

    return correspondeFiltro && correspondeBusca;
  });

  function alternarSensor(id) {
    setListaSensores(listaAtual =>
      listaAtual.map(sensor =>
        sensor.id === id
          ? { ...sensor, ativo: !sensor.ativo }
          : sensor
      )
    );
  }

  function CartaoSensor({ sensor }) {
    return (
      <Pressable
        style={styles.sensor}
        onPress={() => alternarSensor(sensor.id)}
        accessibilityRole="button"
        accessibilityLabel={`${sensor.id}, ${sensor.tipo}, ${
          sensor.ativo ? 'ativo' : 'inativo'
        }. Toque para alterar o status.`}
      >
        <View
          style={[
            styles.linhaStatus,
            {
              backgroundColor: sensor.ativo
                ? '#10B981'
                : '#FF665B',
            },
          ]}
        />

        <View
          style={[
            styles.icone,
            {
              backgroundColor: sensor.ativo
                ? '#E7F7F1'
                : '#F0F4F8',
            },
          ]}
        >
          <Text
            style={[
              styles.simboloSensor,
              {
                color: sensor.ativo ? '#168766' : '#8A9DBB',
              },
            ]}
          >
            {sensor.icone}
          </Text>
        </View>

        <View style={styles.infoSensor}>
          <Text style={styles.nomeSensor}>{sensor.id}</Text>
          <Text style={styles.tipoSensor}>
            {sensor.tipo.charAt(0).toUpperCase() + sensor.tipo.slice(1)}
          </Text>
        </View>

        <View
          style={[
            styles.status,
            {
              backgroundColor: sensor.ativo ? '#E7F9F3' : '#FFF0EE',
            },
          ]}
        >
          <Text
            style={[
              styles.textoStatus,
              {
                color: sensor.ativo ? '#079B78' : '#F04438',
              },
            ]}
          >
            {'● ' + (sensor.ativo ? 'ATIVO' : 'INATIVO')}
          </Text>
        </View>

        <Text style={styles.seta}>›</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        style={styles.conteudo}
        contentContainerStyle={styles.conteudoInterno}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cabecalho}>
          <View style={styles.logo}>
            <Text style={styles.logoTexto}>♧</Text>
          </View>

          <View style={styles.marca}>
            <View style={styles.nomeMarcaLinha}>
              <Text style={styles.nomeMarca}>VerdeSense</Text>
              <Text style={styles.pontoVerde}>●</Text>
            </View>
            <Text style={styles.subtitulo}>
              CENTRAL DE MONITORAMENTO
            </Text>
          </View>

          <Pressable
            style={styles.botaoAtualizar}
            onPress={() => {
              setBusca('');
              setFiltro('Todos');
            }}
          >
            <Text style={styles.atualizarTexto}>↻</Text>
          </Pressable>
        </View>

        {tela === 'Sensores' ? (
          <>
            <View style={styles.painel}>
              <Text style={styles.rotuloPainel}>
                DISPONIBILIDADE GERAL
              </Text>

              <View style={styles.resumo}>
                <View style={styles.resumoTexto}>
                  <View style={styles.porcentagemLinha}>
                    <Text style={styles.porcentagem}>
                      {listaSensores.length
                        ? Math.round(
                            (ativos / listaSensores.length) * 100
                          )
                        : 0}%
                    </Text>
                    <Text style={styles.online}>online agora</Text>
                  </View>

                  <Text style={styles.operando}>
                    ● Sistema operando normalmente
                  </Text>
                </View>

                <View style={styles.circulo}>
                  <Text style={styles.numeroCirculo}>{ativos}</Text>
                  <Text style={styles.textoCirculo}>ATIVOS</Text>
                </View>
              </View>

              <View style={styles.estatisticas}>
                <View style={styles.estatistica}>
                  <Text style={styles.numeroEstatistica}>
                    {listaSensores.length}
                  </Text>
                  <Text style={styles.legendaEstatistica}>
                    INSTALADOS
                  </Text>
                </View>

                <View style={styles.estatistica}>
                  <Text
                    style={[
                      styles.numeroEstatistica,
                      { color: '#65E2B9' },
                    ]}
                  >
                    {ativos}
                  </Text>
                  <Text style={styles.legendaEstatistica}>
                    CONECTADOS
                  </Text>
                </View>

                <View style={styles.estatistica}>
                  <Text
                    style={[
                      styles.numeroEstatistica,
                      { color: '#FF8D80' },
                    ]}
                  >
                    {inativos}
                  </Text>
                  <Text style={styles.legendaEstatistica}>
                    COM ALERTA
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.busca}>
              <Text style={styles.lupa}>⌕</Text>
              <TextInput
                style={styles.campoBusca}
                placeholder="Buscar sensor ou categoria"
                placeholderTextColor="#8A9DBB"
                value={busca}
                onChangeText={setBusca}
              />
            </View>

            <View style={styles.aviso}>
              <Text style={styles.avisoTexto}>
                ●  Modo demonstração: os dados iniciais reproduzem
                o retorno fornecido da API.
              </Text>
            </View>

            <View style={styles.tituloSecao}>
              <View>
                <Text style={styles.rotuloSecao}>INVENTÁRIO</Text>
                <Text style={styles.tituloLista}>
                  Seus dispositivos
                </Text>
              </View>

              <Text style={styles.resultados}>
                {listaFiltrada.length} resultados
              </Text>
            </View>

            <View style={styles.filtros}>
              {['Todos', 'Ativos', 'Inativos'].map(item => (
                <Pressable
                  key={item}
                  style={[
                    styles.filtro,
                    filtro === item && styles.filtroSelecionado,
                  ]}
                  onPress={() => setFiltro(item)}
                >
                  <Text
                    style={[
                      styles.textoFiltro,
                      filtro === item && styles.textoFiltroSelecionado,
                    ]}
                  >
                    {item}{' '}
                    {item === 'Todos'
                      ? listaSensores.length
                      : item === 'Ativos'
                        ? ativos
                        : inativos}
                  </Text>
                </Pressable>
              ))}
            </View>

            {listaFiltrada.length > 0 ? (
              listaFiltrada.map(sensor => (
                <CartaoSensor key={sensor.id} sensor={sensor} />
              ))
            ) : (
              <Text style={styles.semResultados}>
                Nenhum sensor encontrado.
              </Text>
            )}

            <Text style={styles.dica}>
              Toque em um sensor para ativá-lo ou desativá-lo.
            </Text>
          </>
        ) : tela === 'Sincronizar' ? (
          <View style={styles.paginaAlternativa}>
            <Text style={styles.iconeAlternativo}>↻</Text>
            <Text style={styles.tituloAlternativo}>
              Sincronizar sensores
            </Text>
            <Text style={styles.descricaoAlternativa}>
              Os estados apresentados são locais. Para sincronizar
              alterações com os dispositivos reais, conecte a API.
            </Text>
            <Pressable
              style={styles.botaoVerde}
              onPress={() => setTela('Sensores')}
            >
              <Text style={styles.textoBotaoVerde}>
                Voltar ao painel
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.paginaAlternativa}>
            <Text style={styles.iconeAlternativo}>ⓘ</Text>
            <Text style={styles.tituloAlternativo}>
              Sobre o VerdeSense
            </Text>
            <Text style={styles.descricaoAlternativa}>
              Central de monitoramento para acompanhar dispositivos,
              estados e alertas em um só lugar.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.navegacao}>
        {[
          { nome: 'Sensores', icone: '▦' },
          { nome: 'Sincronizar', icone: '↻' },
          { nome: 'Sobre', icone: 'ⓘ' },
        ].map(item => (
          <Pressable
            key={item.nome}
            style={styles.itemNavegacao}
            onPress={() => setTela(item.nome)}
          >
            <View
              style={[
                styles.fundoNavegacao,
                tela === item.nome && styles.navegacaoAtiva,
              ]}
            >
              <Text
                style={[
                  styles.iconeNavegacao,
                  tela === item.nome && styles.iconeNavegacaoAtiva,
                ]}
              >
                {item.icone}
              </Text>
            </View>

            <Text
              style={[
                styles.textoNavegacao,
                tela === item.nome && styles.textoNavegacaoAtivo,
              ]}
            >
              {item.nome}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFA',
  },
  conteudo: {
    flex: 1,
  },
  conteudoInterno: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 120,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  logo: {
    width: 55,
    height: 55,
    borderRadius: 17,
    backgroundColor: '#103F35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  logoTexto: {
    color: '#65E2B9',
    fontSize: 34,
  },
  marca: {
    flex: 1,
  },
  nomeMarcaLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  nomeMarca: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#103F35',
  },
  pontoVerde: {
    fontSize: 13,
    color: '#10B981',
  },
  subtitulo: {
    color: '#8A9DBB',
    fontSize: 11,
    marginTop: 5,
  },
  botaoAtualizar: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E8EF',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  atualizarTexto: {
    color: '#168766',
    fontSize: 29,
  },
  painel: {
    backgroundColor: '#103F31',
    borderRadius: 29,
    padding: 23,
    marginBottom: 20,
  },
  rotuloPainel: {
    color: '#65E2B9',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  resumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 27,
  },
  resumoTexto: {
    flex: 1,
    paddingRight: 8,
  },
  porcentagemLinha: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  porcentagem: {
    fontSize: 43,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  online: {
    color: '#B9D8CD',
    fontSize: 12,
    marginLeft: 8,
  },
  operando: {
    color: '#BFE9D9',
    fontSize: 12,
    marginTop: 8,
  },
  circulo: {
    width: 88,
    height: 88,
    borderWidth: 8,
    borderColor: '#65E2B9',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numeroCirculo: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
  },
  textoCirculo: {
    color: '#B9D8CD',
    fontSize: 9,
    marginTop: 2,
  },
  estatisticas: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#365D50',
    backgroundColor: '#1C4A3D',
    paddingVertical: 13,
  },
  estatistica: {
    flex: 1,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: '#365D50',
  },
  numeroEstatistica: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 22,
  },
  legendaEstatistica: {
    color: '#9ABCB0',
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 7,
  },
  busca: {
    height: 61,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E8EF',
    borderRadius: 19,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    marginBottom: 15,
  },
  lupa: {
    fontSize: 30,
    color: '#8A9DBB',
    marginRight: 10,
  },
  campoBusca: {
    flex: 1,
    fontSize: 16,
    color: '#103F35',
  },
  aviso: {
    backgroundColor: '#FFF8E8',
    borderColor: '#FFE5AC',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 29,
  },
  avisoTexto: {
    color: '#94601A',
    fontSize: 13,
    lineHeight: 22,
  },
  tituloSecao: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  rotuloSecao: {
    color: '#168766',
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 8,
  },
  tituloLista: {
    color: '#103F35',
    fontWeight: 'bold',
    fontSize: 21,
  },
  resultados: {
    color: '#8A9DBB',
    fontSize: 12,
    marginBottom: 5,
  },
  filtros: {
    flexDirection: 'row',
    backgroundColor: '#EDF4F0',
    padding: 5,
    borderRadius: 16,
    marginBottom: 18,
  },
  filtro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  filtroSelecionado: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  textoFiltro: {
    color: '#8A9DBB',
    fontSize: 13,
  },
  textoFiltroSelecionado: {
    color: '#103F35',
    fontWeight: 'bold',
  },
  sensor: {
    minHeight: 91,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3EAF0',
    borderRadius: 21,
    marginBottom: 12,
    paddingHorizontal: 9,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  linhaStatus: {
    width: 3,
    alignSelf: 'stretch',
    marginRight: 13,
    borderRadius: 3,
  },
  icone: {
    width: 55,
    height: 55,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  simboloSensor: {
    fontSize: 27,
  },
  infoSensor: {
    flex: 1,
  },
  nomeSensor: {
    color: '#103F35',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  tipoSensor: {
    color: '#8A9DBB',
    fontSize: 13,
  },
  status: {
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 12,
  },
  textoStatus: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  seta: {
    color: '#B7C9DE',
    fontSize: 26,
    marginRight: 4,
  },
  semResultados: {
    color: '#8A9DBB',
    fontSize: 15,
    textAlign: 'center',
    padding: 30,
  },
  dica: {
    color: '#8A9DBB',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  navegacao: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    height: 82,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 8,
    shadowColor: '#103F35',
    shadowOpacity: 0.08,
    shadowRadius: 15,
  },
  itemNavegacao: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fundoNavegacao: {
    width: 55,
    height: 35,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navegacaoAtiva: {
    backgroundColor: '#E7F7F1',
  },
  iconeNavegacao: {
    color: '#8A9DBB',
    fontSize: 24,
  },
  iconeNavegacaoAtiva: {
    color: '#168766',
  },
  textoNavegacao: {
    color: '#8A9DBB',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 5,
  },
  textoNavegacaoAtivo: {
    color: '#168766',
  },
  paginaAlternativa: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E3EAF0',
    padding: 25,
    alignItems: 'center',
    marginTop: 15,
  },
  iconeAlternativo: {
    fontSize: 48,
    color: '#168766',
    marginBottom: 15,
  },
  tituloAlternativo: {
    color: '#103F35',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
  },
  descricaoAlternativa: {
    color: '#71859B',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
  },
  botaoVerde: {
    backgroundColor: '#103F35',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 14,
    marginTop: 20,
  },
  textoBotaoVerde: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
