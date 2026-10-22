package com.mohitsharma.portfolio.contact;

import org.springframework.data.jpa.repository.JpaRepository;

interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

}
