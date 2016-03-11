'use strict';

//Repository for trainer information
app.factory('mainRepository', function ($http, $q) {

    var basePath_ = 'http://192.168.15.196:10010'

    /**
     *
     * List of polls
     * @param {!angular.$http.Config=} opt_extraHttpRequestParams Extra HTTP parameters to send.
     * @return {!angular.$q.Promise<!Array<!API.Client.Poll>>}
     */
    function getAllPolls(opt_extraHttpRequestParams) {
        /** @const {string} */
        var path = basePath_ + '/polls';

        /** @type {!Object} */
        var queryParameters = {};

        /** @type {!Object} */
        var headerParams = angular.extend({}, this.defaultHeaders);
        /** @type {!Object} */
        var httpRequestParams = {
            method: 'GET',
            url: path,
            json: true,


            params: queryParameters,
            headers: headerParams
        };

        if (opt_extraHttpRequestParams) {
            httpRequestParams = angular.extend(httpRequestParams, opt_extraHttpRequestParams);
        }

        return $http(httpRequestParams);
    }

    /**
     *
     * Returns a single poll
     * @param {!string} id Poll id
     * @param {!angular.$http.Config=} opt_extraHttpRequestParams Extra HTTP parameters to send.
     * @return {!angular.$q.Promise<!API.Client.Poll>}
     */
    function getSinglePoll(id, opt_extraHttpRequestParams) {
        /** @const {string} */
        var path = basePath_ + '/polls/{id}'
                .replace('{' + 'id' + '}', String(id));

        /** @type {!Object} */
        var queryParameters = {};

        /** @type {!Object} */
        var headerParams = angular.extend({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling getSinglePoll');
        }
        /** @type {!Object} */
        var httpRequestParams = {
            method: 'GET',
            url: path,
            json: true,


            params: queryParameters,
            headers: headerParams
        };

        if (opt_extraHttpRequestParams) {
            httpRequestParams = angular.extend(httpRequestParams, opt_extraHttpRequestParams);
        }

        return $http(httpRequestParams);
    }

    /**
     *
     * Post a vote
     * @param {!string} id Poll id
     * @param {!VoteParameters} voteParameters Vote parameters (user and vote)
     * @param {!angular.$http.Config=} opt_extraHttpRequestParams Extra HTTP parameters to send.
     * @return {!angular.$q.Promise<!API.Client.Poll>}
     */
    function vote(id, voteParameters, opt_extraHttpRequestParams) {
        /** @const {string} */
        var path = basePath_ + '/polls/{id}'
                .replace('{' + 'id' + '}', String(id));

        /** @type {!Object} */
        var queryParameters = {};

        /** @type {!Object} */
        var headerParams = angular.extend({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling vote');
        }
        // verify required parameter 'voteParameters' is set
        if (!voteParameters) {
            throw new Error('Missing required parameter voteParameters when calling vote');
        }
        /** @type {!Object} */
        var httpRequestParams = {
            method: 'PUT',
            url: path,
            json: true,
            data: voteParameters,


            params: queryParameters,
            headers: headerParams
        };

        if (opt_extraHttpRequestParams) {
            httpRequestParams = angular.extend(httpRequestParams, opt_extraHttpRequestParams);
        }

        return $http(httpRequestParams);
    }


    return{
        getAllPolls : getAllPolls,
        getSinglePoll : getSinglePoll,
        vote : vote,
    }

});