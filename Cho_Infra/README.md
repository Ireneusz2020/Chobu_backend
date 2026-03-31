# Cho_Infra
Infrastruktura dla Chobu.

## Zawartość
- docker-compose.yml
- Kubernetes manifests: namespace, deployments, services, configmap, secret, ingress

## Deploy docker-compose
```bash
docker compose up --build
```

## Deploy Kubernetes
```bash
kubectl apply -f k8s/
```
