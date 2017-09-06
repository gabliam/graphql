
import { Value, Bean, PluginConfig } from '@gabliam/core';
import { DEFAULT_END_POINT_URL, DEFAULT_END_POINT_URL_GRAPHIQL, GRAPHQL_PLUGIN_CONFIG } from './constants';
import * as Joi from 'joi';
import { GraphiqlOptions, GraphqlConfig } from './interfaces';

export const GraphiqlOptionsValidator = Joi.object().keys({
  subscriptionsEndpoint: Joi.string(),
  query: Joi.string(),
  variables: Joi.object(),
  operationName: Joi.number(),
  result: Joi.object(),
  passHeader: Joi.string()
});

@PluginConfig()
export class GraphqlPluginConfig {
  @Value('application.graphql.endpointUrl', Joi.string())
  private endpointUrl: string = DEFAULT_END_POINT_URL;

  @Value('application.graphql.graphqlFiles', Joi.array().items(Joi.string()))
  private graphqlFiles: string[] | undefined;

  @Value('application.graphiql.endpointUrl', Joi.string())
  private endpointUrlGraphiql: string = DEFAULT_END_POINT_URL_GRAPHIQL;

  @Value('application.graphiql.options', GraphiqlOptionsValidator)
  private graphiqlOptions: GraphiqlOptions = {};


  @Bean(GRAPHQL_PLUGIN_CONFIG)
  creatreConfig(): GraphqlConfig {
    return {
      endpointUrl: this.endpointUrl,
      endpointUrlGraphiql: this.endpointUrlGraphiql,
      graphqlFiles: this.graphqlFiles,
      graphiqlOptions: {
        endpointURL: this.endpointUrl,
        ...(this.graphiqlOptions)
      }
    };
  }
}




