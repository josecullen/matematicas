package com.torbitoinc.mates.engine.endpoint.server.handler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.torbitoinc.mates.engine.endpoint.exception.MatesBadRequest;
import com.torbitoinc.mates.engine.endpoint.model.EquationProblemConfig;
import com.torbitoinc.mates.engine.endpoint.model.Problem;
import com.torbitoinc.mates.engine.endpoint.validation.RequestValidation;

import io.vertx.core.Handler;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import math.arithmetic.problem.EquationProblem;

public class EquationProblemHandler implements Handler<RoutingContext>{
	private static final ObjectMapper mapper = new ObjectMapper();
	
	@Override
	public void handle(RoutingContext context) {
		context.vertx().executeBlocking(future -> {

			BodyChecker bodyChecker;
			
			try {
				bodyChecker = new BodyChecker(context.getBodyAsJson());
				
				List<Problem> problems = new ArrayList<>();
				for(int i = 0; i < bodyChecker.getEquationProblemConfig().getRepetitions(); i++){
					math.core.problem.Problem problemGen = new EquationProblem(
							bodyChecker.getEquationProblemConfig().getEquationLevel(),
							bodyChecker.getEquationProblemConfig().getA().createBuilder().build(),
							bodyChecker.getEquationProblemConfig().getX1().createBuilder().build(),
							bodyChecker.getEquationProblemConfig().getX2().createBuilder().build(),
							bodyChecker.getEquationProblemConfig().getX3().createBuilder().build()
						);
					
					problems.add(Problem.create(problemGen));
				}
				future.complete(problems);
				
			} 
			catch (MatesBadRequest e){				
				future.fail(e);
			}
			catch (Exception e) {				
				e.printStackTrace();
				future.fail(MatesBadRequest.DEFAULT);
			}

		}, false, res -> {
			if(res.failed()){
				MatesBadRequest ex = (MatesBadRequest) res.cause();
				context
					.response()
					.setStatusCode(400)
					.putHeader("content-type", "application/json; charset=utf-8")
					.end(Json.encodePrettily(ex.getErrors()));
				
			}else{
				context
					.response()
					.putHeader("content-type", "application/json; charset=utf-8")
					.end(Json.encodePrettily(res.result()));
			}
			
		});

		
	}
	
	
	
	class BodyChecker {
		private EquationProblemConfig equationProblemConfig;
		
		public BodyChecker(JsonObject body) throws JsonParseException, JsonMappingException, IOException {
			String equationProblemString = body.toString();
			
			equationProblemConfig = mapper.readValue(equationProblemString, EquationProblemConfig.class);
			
			List<String> errors = RequestValidation.validate(equationProblemConfig);
			
			if(!errors.isEmpty()){
				throw new MatesBadRequest(errors);
			}
		}

		public EquationProblemConfig getEquationProblemConfig(){
			return equationProblemConfig;
		}

	}

	
	

}
