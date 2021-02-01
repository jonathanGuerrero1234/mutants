resource "aws_lambda_function" "find_mutant_lambda" {
  filename      =  "../lambdas/findMutantLambda/dist/find-mutant.zip"
  function_name = "find_mutant_lambda"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  source_code_hash = base64sha256("../lambdas/findMutantLambda/dist/find-mutant.zip")
  runtime = "nodejs12.x"

  environment {
    variables = {
      TABLE_DNA_NAME = aws_dynamodb_table.dna_table.name
    }
  }
}

resource "aws_lambda_function" "calculate_stats_lambda" {
  filename      =  "../lambdas/calculateStats/dist/calculate_stats.zip"
  function_name = "calculate_stats_lambda"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  source_code_hash = base64sha256("../lambdas/calculateStats/dist/calculate-stats.zip")
  runtime = "nodejs12.x"

  environment {
    variables = {
      TABLE_DNA_NAME = aws_dynamodb_table.dna_table.name
    }
  }
}
