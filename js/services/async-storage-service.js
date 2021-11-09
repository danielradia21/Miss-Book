import { books } from "../../data/books.js";

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  postMany,
  load,
  _save
};

function query(entityType) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || books;
  _save(entityType, entities);
  return Promise.resolve(entities);
}

function get(entityType, entityId) {
  return query(entityType).then((entities) =>
    entities.find((entity) => entity.id === entityId)
  );
}

function post(entityType, newEntity) {
  
  // console.log(newEntity.id);
  
  return query(entityType).then((entities) => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}

function postMany(entityType, newEntities) {
  return query(entityType).then((entities) => {
    entities.push(...newEntities);
    _save(entityType, entities);
    return entities;
  });
}

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity.id === updatedEntity.id);
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
  });
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity.id === entityId);
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}
function load(entityType) {
  JSON.parse(localStorage.getItem(entityType));
}

function _makeId(length = 5) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
