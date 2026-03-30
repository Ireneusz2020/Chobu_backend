# Chobu Backend — Infrastructure

Repo zawiera szablon infrastruktury dla backendu oparty o Kubernetes + lokalne środowisko developerskie w Docker Compose.

## Co jest w środku

- `docker-compose.yml` — szybkie lokalne środowisko (PostgreSQL + Redis + Adminer).
- `k8s/base` — bazowe manifesty K8s dla backendu, Postgresa i Redisa.
- `k8s/overlays/dev` — overlay developerski (kustomize) z mniejszymi zasobami.
- `.env.example` — przykładowe zmienne środowiskowe.

## Szybki start (local)

```bash
cp .env.example .env
docker compose up -d
```

Usługi domyślnie:

- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`
- Adminer: `http://localhost:8080`

## Szybki start (Kubernetes)

```bash
kubectl apply -k k8s/overlays/dev
```

## Ważne

- W środowiskach produkcyjnych przenieś sekrety do managera sekretów (Vault/Secrets Manager/SealedSecrets).
- Zmień `image` backendu na właściwy obraz aplikacji.
