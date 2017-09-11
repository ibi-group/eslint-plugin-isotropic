import * as _eslintPluginIsotropic from '../js/eslint-plugin-isotropic.js';
import _chai from 'chai';
import _mocha from 'mocha';

_mocha.describe('eslint-plugin-isotropic', () => {
    _mocha.it('should be an eslint plugin object', () => {
        _chai.expect(_eslintPluginIsotropic).to.be.an('object');
        _chai.expect(_eslintPluginIsotropic).to.have.property('configs').that.is.an('object');
        _chai.expect(_eslintPluginIsotropic.configs).to.have.property('isotropic').that.is.an('object');
        _chai.expect(_eslintPluginIsotropic.configs.isotropic).not.to.have.property('ecmaFeatures');
        _chai.expect(_eslintPluginIsotropic.configs.isotropic).not.to.have.property('env');
        _chai.expect(_eslintPluginIsotropic.configs.isotropic).not.to.have.property('parserOptions');
        _chai.expect(_eslintPluginIsotropic.configs.isotropic).not.to.have.property('root');
        _chai.expect(_eslintPluginIsotropic.configs.isotropic).to.have.property('rules').that.is.an('object');
        _chai.expect(_eslintPluginIsotropic).to.have.property('rules').that.is.an('object');
    });
});
