import { expect } from "chai";
import Sinon from "sinon";
import {onlyGetMethodAllowed} from "../../middlewares/methodNotAllowed.js";

describe('Middlware Testing', () => {

    describe('Only Get Method Allowed', () => {
        it('should return 405 status code', async () => {
            
            const req = { method: 'POST' };
            const res = { status: Sinon.stub().returns({ send: Sinon.spy() }), header: Sinon.spy()};
            const next = Sinon.spy();
            onlyGetMethodAllowed(req, res, next);
            expect(res.status.calledWith(401)).to.be.true;
        });
    }
    );
});
