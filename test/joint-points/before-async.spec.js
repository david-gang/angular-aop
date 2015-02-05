describe('After joint-point', function () {
  'use strict';

  commonJointpointTests(JOINT_POINTS.BEFORE_ASYNC);

  it('should invoke the advice after the method', function () {
    var resolved = MaybeQ.when(1);
    var beforeAsync = new Aspects[JOINT_POINTS.BEFORE_ASYNC](function () {
      adviceCalled = true;
      expect(methodCalled).toBeFalsy();
      return resolved;
    });
    var params = {
      method: function () {
        methodCalled = true;
        expect(adviceCalled).toBeTruthy();
      },
      context: {}
    };
    var adviceCalled = false;
    var methodCalled = false;
    beforeAsync._wrapper(params);
  });
});