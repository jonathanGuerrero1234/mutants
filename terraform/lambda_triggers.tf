resource "aws_lambda_permission" "lambda_permission_find_mutant_post_rest" {
  depends_on    = [aws_lambda_function.find_mutant_lambda]
  principal     = "apigateway.amazonaws.com"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.find_mutant_lambda.function_name
  source_arn = "${aws_api_gateway_rest_api.rest_api.execution_arn}/*/${aws_api_gateway_method.find_mutant_post_method.http_method}${aws_api_gateway_resource.find_mutant_resource.path}"
}

resource "aws_lambda_permission" "lambda_permission_person_get_rest" {
  depends_on    = [aws_lambda_function.calculate_stats_lambda]
  principal     = "apigateway.amazonaws.com"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.calculate_stats_lambda.function_name
  source_arn = "${aws_api_gateway_rest_api.rest_api.execution_arn}/*/${aws_api_gateway_method.calculate_stats_get_method.http_method}${aws_api_gateway_resource.calculate_stats_resource.path}"
}
