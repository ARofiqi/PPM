import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import api from '../axios';

const colors = {
  bgApp: '#EEEDED',
  primary: '#37AFE1',
  danger: '#FF2C2C',
  background: '#fff',
  shadow: '#000',
  textPrimary: '#555',
  border: '#ccc',
  input: 'white',
  buttonText: '#fff',
};

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchBooks = () => {
    api
      .get('/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = () => {
    api
      .post('/books', {title, author})
      .then(response => {
        setBooks([...books, response.data]);
        setTitle('');
        setAuthor('');
      })
      .catch(error => console.error(error));
  };

  const deleteBook = id => {
    api
      .delete(`/books/${id}`)
      .then(() => setBooks(books.filter(book => book.id !== id)))
      .catch(error => console.error(error));
  };

  const startEdit = book => {
    setEditMode(true);
    setEditId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
  };

  const saveEdit = () => {
    api
      .put(`/books/${editId}`, {title, author})
      .then(response => {
        const updatedBooks = books.map(book =>
          book.id === editId ? response.data : book,
        );
        setBooks(updatedBooks);
        setTitle('');
        setAuthor('');
        setEditMode(false);
        setEditId(null);
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📖 Library Books</Text>

      <TextInput
        style={styles.input}
        placeholder="Book Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={text => setAuthor(text)}
      />
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: editMode ? colors.primary : colors.primary},
        ]}
        onPress={editMode ? saveEdit : addBook}>
        <Text style={styles.buttonText}>
          {editMode ? '💾 Save Changes' : '+ Add Book'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={books}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>Author: {item.author}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: colors.primary}]}
                onPress={() => startEdit(item)}>
                <Text style={styles.buttonText}>✏️ Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: colors.danger}]}
                onPress={() => deleteBook(item.id)}>
                <Text style={styles.buttonText}>🗑️ Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.bgApp,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.input,
    padding: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.background,
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: 'bold',
  },
});

export default BookList;
