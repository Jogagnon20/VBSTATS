// Manual mock for expo-sqlite used by Jest tests
// Provides openDatabaseAsync which returns a DB object with async helpers used in code

function makeEmptyResult() {
  return { rows: { _array: [], item: () => null, length: 0 }, rowsAffected: 0, lastInsertRowId: undefined };
}

const mockDB = {
  _name: 'mock-db',
  async execAsync(sql) {
    // simulate execution of SQL statements (no-op)
    return Promise.resolve();
  },
  async runAsync(sql, params) {
    // simulate insert/update/delete with a result containing lastInsertRowId
    return Promise.resolve({ lastInsertRowId: 1, rowsAffected: 1 });
  },
  async getFirstAsync(sql, params) {
    return Promise.resolve(null);
  },
  async getAllAsync(sql, params) {
    return Promise.resolve([]);
  }
};

module.exports = {
  async openDatabaseAsync(name) {
    return Object.assign({}, mockDB, { _name: name });
  }
};
