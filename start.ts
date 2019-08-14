import SimpleServer from './SimpleServer';

// Start the server or run tests
if (process.argv[2] !== 'test') {
    let server = new SimpleServer();
    server.start(8000);
} else {}