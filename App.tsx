import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [user, setUser] = useState("")
  const [repo, setRepo] = useState<any>([])

  function getGitHub() {

    fetch(`https://api.github.com/users/${user}/repos`)
      .then((response) => response.json())
      .then((data) => {
        setRepo(data)
        console.log(repo)
      })
      .catch((error) => {
        console.error('Ocorreu um erro na solicitação: ' + error);
      });
  }
  return (
    <View style={styles.container}>
      <Text style = {styles.title}>Listador de Repositórios</Text>
      <TextInput style = {styles.input} placeholder='Nome do Usuário' value={user} onChangeText={(e) => setUser(e)}></TextInput>
      <TouchableOpacity style={styles.btn} onPress ={getGitHub}>
        <Text style={styles.text}>Pesquisar</Text>
      </TouchableOpacity>
      <FlatList
      style={styles.list}
      data={repo}
      renderItem={(
        ({ item }) => (
          <View style={styles.repo}>
            <Text style={styles.info}>Nome: {item.name}</Text>
          </View>
        )
      )}></FlatList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30
  },
  text: {
    color: "#fff"
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "70%",
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20
  },
  input: {
    width: "75%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20
  },
  list: {
    width: "75%"
  },
  repo: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  info: {
    fontSize: 15,
    marginBottom: 10
  }
});
