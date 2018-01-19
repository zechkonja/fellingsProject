import cryptico from 'cryptico';
import store from '../store';

export default {
  methods: {
    encrypt(text) {
      return cryptico.encrypt(text, cryptico.publicKeyString(store.state.RSAkey)).cipher;
    },

    decrypt(text) {
      return cryptico.decrypt(text, store.state.RSAkey).plaintext;
    },
  },
};
