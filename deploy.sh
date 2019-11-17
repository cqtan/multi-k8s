docker build -t couchcat/docker-fib-react:latest -t couchcat/docker-fib-react:$SHA -f ./client/Dockerfile ./client
docker build -t couchcat/docker-fib-server:latest -t couchcat/docker-fib-server:$SHA -f ./server/Dockerfile ./server
docker build -t couchcat/docker-fib-worker:latest -t couchcat/docker-fib-worker:$SHA -f ./worker/Dockerfile ./worker

docker push couchcat/docker-fib-react:latest
docker push couchcat/docker-fib-server:latest
docker push couchcat/docker-fib-worker:latest

docker push couchcat/docker-fib-react:$SHA
docker push couchcat/docker-fib-server:$SHA
docker push couchcat/docker-fib-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=couchcat/docker-fib-server:$SHA
kubectl set image deployments/client-deployment client=couchcat/docker-fib-react:$SHA
kubectl set image deployments/worker-deployment worker=couchcat/docker-fib-worker:$SHA