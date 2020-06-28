<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\LikeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ApiResource(
 * 
 *  itemOperations={
 *     "DELETE"={
 *             "security"="is_granted('ROLE_ADMIN') or (is_granted('ROLE_USER') and object.getUser() == user)",
 *             "security_message"="vous avez pas le droit de supprimer ce like"
 *      },
 *      "GET"= { },
 *    },
 *    collectionOperations={
 *       "GET" = {}, 
 *       "POST"={
 *            "security"="is_granted('ROLE_USER')",
 *           "security_message"="vous avez pas le droit de créer une like !"
 *      }
 *    },
 * )
 * @ApiFilter(SearchFilter::class, properties={"user": "exact", "product": "exact"})
 * @ORM\Entity(repositoryClass=LikeRepository::class)
 * @ORM\Table(name="`like`")
 */
class Like
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"product-read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Product::class, inversedBy="likes")
     * @ORM\JoinColumn(nullable=false)
     */
    private $product;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="likes")
     * @ORM\JoinColumn(nullable=false)
     * * @Groups({"like-read"})
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
