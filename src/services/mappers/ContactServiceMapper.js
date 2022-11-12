class ContactServiceMapper {
  toPersistent(domainData) {
    return {
      id: domainData.id,
      name: domainData.name,
      email: domainData.email,
      phone: domainData.telephone,
      category_id: domainData.categoryId
    };
  }

  toDomain(persistenceData) {
    return {
      id: persistenceData.id,
      name: persistenceData.name,
      email: persistenceData.email,
      telephone: persistenceData.phone,
      category: {
        id: persistenceData.category_id,
        name: persistenceData.category_name
      }
    };
  }
}

export default new ContactServiceMapper();
