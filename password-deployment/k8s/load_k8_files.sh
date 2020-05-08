#!/bin/bash

kubectl apply -f env-configmap.yaml
kubectl apply -f aws-secret.yaml
kubectl apply -f env-secret.yaml
kubectl apply -f backend-password-service.yaml
kubectl apply -f backend-password-deployment.yaml
kubectl apply -f backend-user-service.yaml
kubectl apply -f backend-user-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f reverseproxy-service.yaml
kubectl apply -f reverseproxy-deployment.yaml