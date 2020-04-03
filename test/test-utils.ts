import chai from 'chai';
import chaiArrays from 'chai-arrays';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';
import chaiString from 'chai-string';

chai.should();
chai.use(chaiArrays);
chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.use(chaiString);

const expect = chai.expect;

export {
  expect
};
