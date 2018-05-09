from predict import Predict
from args import *
from db import *
import json

# /home/lem/Public/funny/python.sh /home/lem/Public/funny/predict --host "127.0.0.1" --base "funny" --user "aroot" --pass "aroot" --id 30

cnx = connect(**base)
svms, ngrams = select_last_weights(cnx)
indexes = select_indexes(cnx)

predict = Predict(svms, indexes, ngrams)
uid = predict.text(text)
predict.calc()

type = predict.type(uid)
prob = predict.probability(uid)
top = predict.top()

result = { "type" : type, "probability" : prob, "top" : top }
print(json.dumps(result))
