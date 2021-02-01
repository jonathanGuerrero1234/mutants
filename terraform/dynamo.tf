resource "aws_dynamodb_table" "dna_table" {
  name           = "dna_table"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "dna"

  attribute {
    name = "dna"
    type = "S"
  }

}
