import { AsyncStorage } from 'react-native';
const storageKey = '@diego:data'

async function read() {
  const storageData = await AsyncStorage.getItem(storageKey);
  return JSON.parse(storageData);
}

async function checkId( id ) {
  const { passwords } = await read();
  var ids = [];
  for ( item of passwords) {
    ids.push( item.id );
  }
  if ( ids.includes( id )) {
    return true // true: Id exists
  } else {
    return false // false: Id does not exists
  }
}

async function create( pwd ) {
   let id = Math.random().toString(32).substr(2, 8);
  while (await checkId( id )) {
    id = Math.random().toString(32).substr(2, 8);
  }
  pwd.id = id;
  var data = await read();
  data.passwords.push( pwd );
  await AsyncStorage.setItem(storageKey, JSON.stringify(data))
  return true
}

async function update( pwd ) {
  if (await checkId( pwd.id )) {
    var data = await read();
    const check = (item) => item.id === pwd.id;
    const dataIndex = data.passwords.findIndex(check);
    data.passwords[dataIndex] = pwd;
    await AsyncStorage.setItem(storageKey, JSON.stringify(data))
    return true
  } else {
    return false
  }
}

async function delelteById( id ) {
  if (await checkId( id )) {
    var data = await read();
    const check = item => item.id === id;
    //console.log(data.passwords)
    const dataIndex = data.passwords.findIndex(check);
    data.passwords.splice(dataIndex, 1);
    await AsyncStorage.setItem(storageKey, JSON.stringify(data))
    return true
  } else {
    return false
  }
}
export { create, read, update, delelteById, storageKey }
