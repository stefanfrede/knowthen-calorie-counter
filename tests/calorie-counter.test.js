import { expect, use } from 'chai';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';

use(sinonChai);

describe('createCalorieCounter', function() {
  afterEach(() => {
    sinon.restore();
  });

  it('should test true equals true', function() {
    expect(true).to.equal(true);
  });
});
