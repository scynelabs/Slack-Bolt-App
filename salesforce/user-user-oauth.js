'use strict';

const jsforce = require('jsforce');

class UserToUserAuth {
    constructor(config, instanceUrl, token) {
        this.config = config;
        this.instanceUrl = instanceUrl;
        this.token = token;
    }

    async connect() {
        try {

            console.log()
            const conn_config = {
                oauth2: {
                    loginUrl: this.config.loginUrl,
                    clientId: this.config.clientId,
                    clientSecret: this.config.clientSecret,
                    redirectUri: `${this.config.herokuUrl}/oauthcallback`
                },
                instanceUrl: this.instanceUrl,
                accessToken: this.token.accessToken,
                refreshToken: this.token.refreshToken,
                version: this.config.apiVersion
            };
            console.log('Connection config ===>', conn_config)
            this.conn = new jsforce.Connection(conn_config);
            await this.conn.oauth2.refreshToken(this.token.refreshToken);
            return this.conn;
        } catch (e) {
            throw new Error(
                `Can't establish connection with Salesforce, reason: ${e.message}`
            );
        }
    }
}

module.exports = UserToUserAuth;
