import { Logger } from '@overnightjs/logger';
import SimpleServer from './SimpleServer';

// Start the server or run tests
/*
if (process.argv[2] !== 'test') {
    let server = new SimpleServer();
    server.start(8000);
} else {}
*/
// Start the server or run tests
if (process.env.NODE_ENV !== 'testing') {

    let server = new SimpleServer();
    server.start(process.env.NODE_ENV === 'development' ? 3001 : 8081);

} else {

    const Jasmine = require('jasmine');
    const jasmine = new Jasmine();

    jasmine.loadConfig({
        "spec_dir": "src",
        "spec_files": [
            "./controllers/**/*.test.ts"
        ],
        "stopSpecOnExpectationFailure": false,
        "random": true
    });

    jasmine.onComplete((passed: boolean) => {
        if (passed) {
            Logger.Info('All tests have passed :)');
        } else {
            Logger.Err('At least one test has failed :(');
        }
    });

    let testPath = process.argv[3];

    if (testPath) {
        testPath = `./src/${testPath}.test.ts`;
        jasmine.execute([testPath]);
    } else {
        jasmine.execute();
    }
}
