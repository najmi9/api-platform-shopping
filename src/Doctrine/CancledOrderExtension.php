<?php

declare(strict_types=1);

namespace App\Doctrine;

use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use Symfony\Component\Security\Core\Security;
use App\Entity\CancledOrder;

class CancledOrderExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass)
    {    
        $user = $this->security->getUser();  

     if (null === $user || $resourceClass !== CancledOrder::class || $this->security->isGranted('ROLE_ADMIN')) {
          return;
        } 
        $rootAlias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->andWhere(sprintf("%s.user = :current_user",  $rootAlias));
        $queryBuilder->setParameter("current_user", $user);
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?string $operationName = null)
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, ?string $operationName = null, array $context = [])
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }
}
