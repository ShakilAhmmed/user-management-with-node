'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('Brands', 'address', { type: Sequelize.TEXT, allowNull: true }),
      queryInterface.addColumn('Brands', 'slug', { type: Sequelize.STRING, allowNull: true })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('Brands', 'address'),
      queryInterface.removeColumn('Brands', 'slug')
    ]);
  }
};
