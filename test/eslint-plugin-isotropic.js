import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _eslintPluginIsotropic from '../js/eslint-plugin-isotropic.js';
import _mocha from 'isotropic-dev-dependencies/lib/mocha.js';

_mocha.describe('eslint-plugin-isotropic', () => {
    _mocha.it('should be an eslint plugin object', () => {
        _chai.expect(_eslintPluginIsotropic).to.be.an('object');
        _chai.expect(_eslintPluginIsotropic).to.have.property('configs').that.is.an('object');
        _chai.expect(_eslintPluginIsotropic.configs).to.have.property('isotropic').that.is.an('object');
        _chai.expect(_eslintPluginIsotropic.configs.isotropic).not.to.have.property('ecmaFeatures');
        _chai.expect(_eslintPluginIsotropic.configs.isotropic).not.to.have.property('env');
        _chai.expect(_eslintPluginIsotropic.configs.isotropic).not.to.have.property('globals');
        _chai.expect(_eslintPluginIsotropic.configs.isotropic).not.to.have.property('parserOptions');
        _chai.expect(_eslintPluginIsotropic.configs.isotropic).to.have.property('plugins').that.is.an('object');
        _chai.expect(_eslintPluginIsotropic.configs.isotropic.plugins).to.have.property('isotropic').that.equals(_eslintPluginIsotropic);
        _chai.expect(_eslintPluginIsotropic.configs.isotropic).not.to.have.property('root');
        _chai.expect(_eslintPluginIsotropic.configs.isotropic).to.have.property('rules').that.is.an('object');
        _chai.expect(_eslintPluginIsotropic).to.have.property('meta').that.is.an('object');
        _chai.expect(_eslintPluginIsotropic.meta).to.have.property('name').that.is.an('string');
        _chai.expect(_eslintPluginIsotropic.meta).to.have.property('version').that.is.an('string');
        _chai.expect(_eslintPluginIsotropic).to.have.property('rules').that.is.an('object');
    });
});
