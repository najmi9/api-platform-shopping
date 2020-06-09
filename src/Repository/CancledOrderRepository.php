<?php

namespace App\Repository;

use App\Entity\CancledOrder;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method CancledOrder|null find($id, $lockMode = null, $lockVersion = null)
 * @method CancledOrder|null findOneBy(array $criteria, array $orderBy = null)
 * @method CancledOrder[]    findAll()
 * @method CancledOrder[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CancledOrderRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CancledOrder::class);
    }

    // /**
    //  * @return CancledOrder[] Returns an array of CancledOrder objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CancledOrder
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
