class CategoryServiceMapper {
  toDomain(persistenceData) {
    return {
      id: persistenceData.id,
      name: persistenceData.name
    };
  }
}

export default new CategoryServiceMapper();
